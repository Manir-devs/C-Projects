//8. Write a simple goto statement example. <file>8. <mark>Goto</mark> statement example</file>

#include<stdio.h>
int main()
{
  int i = 1;
label1:
  printf("%d ", i);
  i++
  if(i<=10)
  {
    goto label1;
  }
  printf("\nSuccessfully printed 1 to 10.");
  return 0;
}
