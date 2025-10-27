//6. Write the C programme to print natural number from 1 to n. using do-while loop <file>6. Write the C programme to print natural number from 1 to n using do-while loop</file>

#include<stdio.h>
int main()
{
  int i = 1;
  int n;
  printf("Enter the limit of loop: ");
  scanf("%d", &n);
  do
  {
    printf("%d ", i);
    i++;
  }
  while(i<=n);
  return 0;
}
