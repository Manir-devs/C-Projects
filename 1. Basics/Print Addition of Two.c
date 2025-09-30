//5 Write a C program to add two numbers and print the result.

#include<stdio.h>
int main()
{
    int a, b, op;
    
    printf("Enter your first number: ");
    scanf("%d", &a);
    printf("Enter your second number: ");
    scanf("%d", &b);
    op = a + b;
    printf("The addition of %d and %d is %d.", a, b, op);
    return 0;
}
    
