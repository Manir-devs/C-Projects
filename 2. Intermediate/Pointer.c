//19. Give an example of Pointer. <file>19. Give an example of <mark>Pointer</mark></file>

#include <stdio.h>

int main() {
    int a = 10;        // normal integer variable
    int *p;            // declare a pointer to an integer
    p = &a;            // store the address of 'a' in pointer 'p'

    printf("Value of a = %d\n", a);
    printf("Address of a = %p\n", &a);
    printf("Address stored in pointer p = %p\n", p);
    printf("Value pointed to by p = %d\n", *p);  // dereference pointer

    return 0;
}
