from typing import Generator

def fib_func(len: int) -> Generator[int, None, None]:
	a = 0
	b = 1
	# for i in range(len):
	while a < len:
		yield a
		a, b = b, a + b
