//2. Calculate simple interest. Create a function with 3 parameters that is principal, time, rate of interest. <file>2. Calculate <mark>simple interest using function</mark></file>

#include<stdio.h>
int SI(int p, int t, int r)
{
        return p * t * r / 100;
}
int main()
{
        int principal, time, rate;
        float interest;
        printf("\033[2J\033[H");
        printf("Enter principal value: ");
        scanf("%d", &principal);
        printf("Enter time(years): ");
        scanf("%d", &time);
        printf("Enter rate: ");
        scanf("%d", &rate);
        interest = SI(principal, time, rate);
        printf("\nInterest is %.2f", interest);
        return 0;
}

