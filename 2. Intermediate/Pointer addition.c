//20. Write a C program to add two numbers using pointers. <file>20. Write a C program to add two numbers using <mark>pointers</mark></file>

#include<stdio.h>
int main()
{
	int a, b, *m, *n, ptr;
	printf("\033[2J\033[H");        //clear entire screen
	printf("Enter two values: ");
	scanf("%d %d", &a, &b);
	m = &a;
	n = &b;
	ptr = *m + *n;
	printf("\033[2J\033[H");        //clear screen again
	printf("Addition of %d and %d is %d.", a, b, ptr);
	return 0;
}
