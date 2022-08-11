def fib_func(len: int) -> list[int]:
	# if len == 0: return 0
	# if len == 1: return 1
	result = []
	a, b = 0, 1
	while a < len:
		result.append(a)
		a, b = b, a+b
	return result
