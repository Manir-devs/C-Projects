//16. Find the length of string using strlen() function. <file>16. Find the length of string using <mark>strlen()</mark> function</file>

#include<stdio.h>
#include<string.h>
int main()
{
	char str[50];
	printf("Enter string: ");
	scanf(" %[^\n]", str);        //That ' %[^\n]' means scan everything including spaces (Read everything until newline \n character is found)
	printf("Length of string is: %d.", strlen(str));
	return 0;
}
