//9. Check pass or fail using goto statement. <file>9. Check pass or fail using goto statement</file>

#include<stdio.h>
int main()
{
  int num;
  printf("Enter your mark: ");
  scanf("%d", &num);

table1:
  printf("Pass");
table2:
  printf("Fail");

  if(num>30)
  {
    goto table1;
  }
  else
  {
    goto table2;
  }
  return 0;
}
