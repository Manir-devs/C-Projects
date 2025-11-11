//18. Copy strings using strcpy() function. <file>18. Copy strings using <mark>strcpy()</mark></file>

#include<stdio.h>
#include<string.h>
int main()
{
	char S1[30] = "BCA Team Chill Developers";
	char S2[30];
	strcpy(S2, S1);		//(S2, S1) means copy S1 string to S2. so, S1 is source and S2 is Destination.
	printf("%s", S2);
	return 0;
}
