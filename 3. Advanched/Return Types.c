//3. Conditions of return types and arguments. <br><p stype="color:#ff0000;">[Non compilable]</p> <file>3. Conditions of <mark>return types</mark> and arguments</file>

//1. Function with no arguments and no return value:
void boy(void)  //no arguments
{
  printf("I am a boy"); //no return value
}

//2. Function with no arguments and with return value:
int add(void)  //no arguments
{
  int x = 10, y = 20;
  return x + y;   //return value
}

//3. Function with arguments and with no return value:
void multi(int r)  //argument
{
  int result = r * r * 3.14;
  printf("%d", return);
  getch();    //no return value
}
void main()
{
  int radius;
  printf("Enter value: ");
  scanf("%d", &radius);
  multi(radius);
  getch();
}

//4. Function and arguments with return value:
int add(int x, int y)  //arguments
{
  return x+y;  //return value
}
