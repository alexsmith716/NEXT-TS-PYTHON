def fib_func(len: int) -> list[int]:
	result = []
	a = 0
	b = 1
	while a < len:
		result.append(a)
		a, b = b, a+b
	return result
