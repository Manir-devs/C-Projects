//4. Write a C program to swap two numbers using call by reference. <file>4. Write a C program to swap two numbers using <mark>call by reference</mark></file>

#include<stdio.h>
void swap(int *a, int *b);      //function decleration
int main()
{
        int m, n;       //Actual parameter

        printf("Enter m & n values: ");
        scanf("%d %d", &m, &n);  

        printf("\nValues before swap: m = %d, n = %d\n", m, n);
        swap(&m, &n);  //address pass
        printf("Value after swap: m = %d, n = %d\n", m, n);
        return 0;
}


void swap(int *a, int *b)       //Formal parameter
{
        int temp;
        temp = *a;
        *a = *b;
        *b = temp;
}

