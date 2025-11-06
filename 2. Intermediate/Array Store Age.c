//13. Store age of 3 people in array and display them. <file>13. Store age of 3 people in <mark>array</mark> and display them</file>

#include<stdio.h>
int main()
{
  int age[3], i;
  printf("Enter age of 3 people: ");
  for(i=0; i<3; i++)
  {
      scanf("%d", &age[i]);
  }
  for(i=0; i<3; i++)
  {
    printf("%d ", age[i]);
  }
  return 0;
}
