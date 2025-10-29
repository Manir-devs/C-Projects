//8. The Following is an example of break statement-<file>7. <mark>Break statement</mark> example</file>

#include<stdio.h>
int main()
{
  int i;
  for(i=1; i<=10; i++)
  {
    if(i == 6)
      break;        //program will be stop in 6th loop
    printf("%d ", i);
  }
  return 0;
}

//output: 1 2 3 4 5
