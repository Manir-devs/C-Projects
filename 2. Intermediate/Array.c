//11. Simple array example. <file>11. Simple <mark>array</mark> example</file>

#include<stdio.h>
int main()
{
  int i;
  char chars[5] = {'a', 'b', 'c', 'd', 'e'};
  for(i=0; i<=4; i++)
  {
    printf("%c ", chars[i]);
  }
  return 0;
}
