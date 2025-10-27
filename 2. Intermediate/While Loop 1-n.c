//5. Write the C programme to print natural number from 1 to n using While Loop <file>5. Write the C programme to print natural number from 1 to n using While Loop.</file>

#include<stdio.h>
int main()
{
        int n;
        int i = 1;
        printf("Enter a limit to print: ");
        scanf("%d", &n);
        while(i<=n)
        {
                printf("%d ", i);
                i++;
        }
        return 0;
}




