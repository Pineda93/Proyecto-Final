import hashlib
import hmac
import os

ITERACIONES = 200_000


def crear_password(password: str) -> str:
	sal = os.urandom(16)
	hash_bytes = hashlib.pbkdf2_hmac(
		"sha256",
		password.encode(),
		sal,
		ITERACIONES,
	)
	return sal.hex() + "$" + hash_bytes.hex()


def verificar_password(password_guardada: str, password: str) -> bool:
	sal_hex, hash_hex = password_guardada.split("$", maxsplit=1)
	hash_nuevo = hashlib.pbkdf2_hmac(
		"sha256",
		password.encode(),
		bytes.fromhex(sal_hex),
		ITERACIONES,
	)
	return hmac.compare_digest(hash_nuevo.hex(), hash_hex)
