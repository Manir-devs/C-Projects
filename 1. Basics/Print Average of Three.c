//4. Write a C programe code to print average of three numbers. <file>4. Write a C programe code to print <mark>average of three</mark> numbers</file>

#include<stdio.h>
int main()
{
    int a, b, c;
    float avg;
    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);
    avg = (a + b + c) / 3.0;
    printf("The average value of given three numbers is: %.2f", avg);
    return 0;
}
