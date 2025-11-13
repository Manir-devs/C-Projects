//5. Write a C program to swap two numbers using call by value. <file>5. Write a C program to swap two numbers using <mark>call by value</mark></file>

#include<stdio.h>
void swap(int a, int b);      //function decleration
int main()
{
        int m, n;       //Actual parameter

        printf("Enter m & n values: ");
        scanf("%d %d", &m, &n);  

        printf("\nValues before swap: m = %d, n = %d\n", m, n);
        swap(m, n);  //value pass
        printf("Value after swap: m = %d, n = %d\n", m, n);
        return 0;
}


void swap(int a, int b)       //Formal parameter
{
        int temp;
        temp = a;
        a = b;
        b = temp;
}
