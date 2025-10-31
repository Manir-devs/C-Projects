//2. Write a C program to find the biggest of given two numbers. <file>2. Write a C program to print the <mark>biggest of given two numbers</mark></file>

#include<stdio.h>
int main()
{
    int a, b, big;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    big = a;
    if(b>a) 
    {
        big = b;
    }
    printf("Biggest number is %d", big);
    return 0;
}
