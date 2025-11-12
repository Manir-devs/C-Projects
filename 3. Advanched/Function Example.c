//1. Add 3 numbers using function. <file>1. Add 3 numbers using <mark>function</mark></file>

#include<stdio.h>
int add(int a, int b, int c)
{
        printf("\033[2J\033[H");
        return a + b + c;
}
int main()
{
        printf("\033[2J\033[H");             //Clears the entire screen.
        int p,q,r,result;
        printf("Enter 3 numbers: ");
        scanf("%d %d %d", &p, &q, &r);
        result = add(p, q, r);               //p=a, q=b, r=c (from function add().)
        printf("Result is: %d", result);
        return 0;
}
