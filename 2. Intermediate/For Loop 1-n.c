//3. Write the C programme to print natural number from 1 to n.

#include<stdio.h>
int main()
{
  int i, n;
  printf("Enter the limit: ");
  scanf("%d", &n);
  for(i=1; i<=n; i++)
  {
    printf("%d", i);
  }
  return 0;
}
