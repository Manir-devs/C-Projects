//7. Switch Case example. <file>7. <mark>Switch Case</mark> Example</file>

#include<stdio.h>
int main()
{
  int choice;
  printf("Enter a number between 1 to 3: ");
  scanf("%d", &choice);
  switch(case)
  {
    case 1:
      printf("You choosed 1.");
      break;
    case 2:
      printf("You choosed 2.");
      break;
    case 3:
      printf("You choosed 3.");
      break;
    default:
      printf("Invalid choice");
  }
  return 0;
}
