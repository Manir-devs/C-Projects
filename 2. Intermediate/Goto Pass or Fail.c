//9. Check pass or fail using goto statement. <file>9. Check pass or fail using goto statement</file>

#include<stdio.h>
int main()
{
  int num;
  printf("Enter your mark: ");
  scanf("%d", &num);
  if(num>30)
    goto table1;
  else
    goto table2;
table1:
  printf("Pass");
  return 0;
table2:
  printf("Fail");
  return 0;
}
