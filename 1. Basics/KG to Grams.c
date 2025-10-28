//6. Write a C program to convert weight from kilograms to grams.<file>6. Write a C program to convert weight from kilograms to grams</file><sm>https://manir-devs.github.io/C-Projects/Ignore-Me/code.html?path=1.%20Basics%2FKG%20to%20Grams.c</sm>

#include <stdio.h>
int main() {
    float kg, g;
    printf("Kilogram to gram converter\n\nEnter weight in kg: ");
    scanf("%f", &kg);
    g = kg * 1000;
    printf("Given weight is %.2f grams.", g);
    return 0;
}
