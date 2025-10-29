//3. Write the C program to print natural number from 1 to n using for loop. <file>3. Write the C program to print natural number from 1 to n using <mark>for loop</mark></file>

#include<stdio.h>
int main()
{
  int i, n;
  printf("Enter the limit: ");
  scanf("%d", &n);
  for(i=1; i<=n; i++)
  {
    printf("%d ", i);
  }
  return 0;
}
