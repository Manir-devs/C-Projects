//7. The Following is an example of continue statement-<file>7. <mark>Continue statement</mark> example</file>

#include<stdio.h>
int main()
{
  int i;
  for(i=1; i<=5; i++)
  {
    if(i == 3)
      continue;        //3 will be skipped.
    printf("%d ", i);
  }
  return 0;
}

//output: 1 2 4 5
