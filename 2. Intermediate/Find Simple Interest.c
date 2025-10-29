//1 Find the simple interest of the following data - <br> P = 5000, rate = 7.5, time = 4 <file>1. Find The Simple <mark>Interest</mark> of Data</file>

#include<stdio.h>

int main() {
    int p = 5000;        // principal
    float rate = 7.5;   // rate of interest
    int time = 4;       // time in years
    float interest;

    interest = p * time * rate / 100;
    printf("Interest is %.2f\n", interest);

    return 0;
}
