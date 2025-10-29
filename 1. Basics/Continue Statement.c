//7. The Following is an example of break statement-<file>7. <mark>Continue statement</mark> example</file>

#include<stdio.h>
int main()
{
  int i;
  for(i=1; i<=5; i++)
  {
    if(i == 3)
      continue;
    printf("%d ", i);
  }
  return 0;
}
