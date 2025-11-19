//6. Write a C program to calculate the factorial of a given number using a recursive function. <file>6. Write a C program to calculate the <mark>factorial of a given number</mark> using a recursive function.</file>

#include<stdio.h>
int fact(unsigned int i)	//unsigned int means positive values only. no negative values.
{
	if(i<=1)
	{
		return 1;
	}
	else
	{
		return i*fact(i-1);
	}
}
int main()
{
	int a;
	printf("\033[2J\033[H");	//Clear entire screen
	printf("Factorial finder!\n");
	printf("\nEnter a value: ");
	scanf("%d", &a);
	printf("Factorial value of %d! is: %d.", a, fact(a));
	return 0;
}
