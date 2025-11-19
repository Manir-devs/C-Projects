//7. Write a C program to find the sum of array elements using a pointer. <file>7. Write a C program to <mark>find the sum of array elements</mark> using <mark>pointer</mark></file>

#include<stdio.h>
int main()
{
	int arr[10], i, *ptr, sum=0;
	printf("\033[2J\033[H");
	for(i=0; i<5; i++)
	{
		printf("Enter value: ");
		scanf("%d", &arr[i]);
	}
	ptr = &arr[0];
	for(i=0; i<5; i++)
	{
		sum = sum + *ptr;
		ptr++;
	}
	printf("\naddition of all values is: %d", sum);
	return 0;
}
          
