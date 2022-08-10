def fib(n: int) -> list[int]:
	result = []
	a, b = 0, 1
	while a < n:
		result.append(a)
		a, b = b, a+b
	return result

# >>> fibonacci.fib(1000)
# 0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
# >>> fibonacci.fib(100)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
