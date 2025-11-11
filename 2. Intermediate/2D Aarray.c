//15. Two dimensional array example. <file>15. <mark>Two dimensional array</mark> example</file>

#include<stdio.h>
int main()
{
	int i, j;
	int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
	printf("Elements of an array: \n\n");
	for(i=0; i<3; i++)
	{
		for(j=0; j<3; j++)
		{
			printf("%d\t", a[i][j]);
		}
		printf("\n");
	}
	return 0;
}
