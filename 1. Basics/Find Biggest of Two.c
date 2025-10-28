//2. Write a C program to find the biggest of given two numbers. <file>2. Write a C program to print the biggest of given two numbers</file><sm>https://manir-devs.github.io/C-Projects/Ignore-Me/code.html?path=1.%20Basics%2FFind%20Biggest%20of%20Two.c</sm>

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
