#!/usr/bin/env bash
VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_ADDR

vault server -config=vault.hcl &
sleep 2

# Initialize Vault
if [ ! -f .vault-unseal ]; then
  OUTPUT=$(vault operator init -key-shares=1 -key-threshold=1 -format=json)
  echo "$OUTPUT" > .vault-unseal
  jq -r '.unseal_keys_hex[0]' .vault-unseal > unseal.key
  jq -r '.root_token' .vault-unseal > root.token
  vault operator unseal $(cat unseal.key)
  vault login $(cat root.token)
  vault policy write clipchronicle policy.hcl
  vault secrets enable -path=secret kv-v2
else
  vault operator unseal $(jq -r '.unseal_keys_hex[0]' .vault-unseal)
  vault login $(cat root.token)
fi
