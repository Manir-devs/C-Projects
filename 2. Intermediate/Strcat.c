//17. Write a C program to concatenate two strings using strcat(). <file>17. Write a C program to concatenate two strings using <mark>strcat()</mark></file>

#include<stdio.h>
#include<string.h>
int main()
{
        char S1[100], S2[100];
        printf("Enter first string: ");
        scanf(" %[^\n]", S1);
        printf("Enter second string: ");
        scanf(" %[^\n]", S2);
        strcat(S1, S2); 
        printf("Output string after concatentation: %s", S1);
        return 0;
}



