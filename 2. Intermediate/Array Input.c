//12. Input 10 numerical values into an array and display them. <file>12. <mark>Input</mark> 10 numerical values <mark>into an array</mark> and display them</file>

#include<stdio.h>
int main()
{
  int num[10], i;
  for(i = 1; i<=10; i++)
  {
    printf("Enter value: ");
    scanf("%d", &num[i]);
  }
  for(i=1; i<=10; i++)
  {
    printf("%d ". num[i]);
  }
  return 0;
}
