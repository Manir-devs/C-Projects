//9. Check pass or fail using goto statement. <file>9. Check pass or fail using goto statement</file>

#include<stdio.h>
int main()
{
  int num;
  printf("Enter your mark: ");
  scanf("%d", &num);
  printf("\nThen you are ");
  if(num>30)
    goto table1;            //jump to label "table 1"
  else
    goto table2;            //jump to label "table 2"
table1:
  printf("pass.");
  return 0;                 //return 0 because code must stop here.
table2:
  printf("fail!");
  return 0;
}
