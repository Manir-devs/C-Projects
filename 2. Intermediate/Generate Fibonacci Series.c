//2. Write a C program to generate and print Fibonacci Series <br> ie: 0 1 1 2 3 5 8 13 ...n <file>2. Generate and Print <mark>Fibonacci Series</mark></file>

#include <stdio.h>

int main() {
    int n, P1 = 0, P2 = 1, newterm;

    // Read limit
    printf("Enter the limit:\a ");
    scanf("%d", &n);

    // Print first two terms
    printf("%d %d ", P1, P2);

    // Calculate next terms while <= n
    newterm = P1 + P2;
    while (newterm <= n) {
        printf("%d ", newterm);
        P1 = P2;             // Move second to first
        P2 = newterm;        // Move newterm to second
        newterm = P1 + P2;   // Generate next term
    }
    return 0;
}
