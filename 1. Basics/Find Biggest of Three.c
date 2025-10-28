//3 Write a C programe to find the biggest of given three numbers. <file>3 Write a C programe to find the biggest of given three numbers</file> <sm>https://manir-devs.github.io/C-Projects/Ignore-Me/code.html?path=1.%20Basics%2FFind%20Biggest%20of%20Three.c</sm>

#include<stdio.h>
int main()
{
    int a, b, c, big;
    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);
    big = a;
    if(b > big)
        big = b;
    if(c > big)
        big = c;
    printf("Biggest number is %d", big);
    return 0;
}
