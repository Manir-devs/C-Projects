//14. Find out the largest and smallest element in an array. <file>14. Find out the <mark>largest and smallest</mark> element in an <mark>array</mark></file>

#include<stdio.h>
int main()
{
	int i, n;
	float a[50], large, small;
	printf("Size of array values: ");
	scanf("%d", &n);
	printf("Array elements are: ");
	for(i=0; i<n; i++)
	{
		scanf("%f", &a[i]);
	}
	large = a[0];
	small = a[0];
	for(i=1; i<n; i++)
	{
		if(a[i]>large)
		{
			large = a[i];
		}
		else if(a[i]<small)
		{
			small = a[i];
		}
	}
	printf("Largest element in vector is %.2f. and,\n", large);
	printf("Smallest element in vector is %.2f.", small);
	return 0;
}
     
