#include <iostream>>
using namespace std;

int main()
{
    int n = 8;
    for (int start = 0; start < n; start++)
    {
        for (int count = 0; count < n; count++)
        {
            cout << "Start: " << start << " Count: " << count << endl;
            cout << "Sum " << start + count;
            int end = (start + count) % n;
            cout << " Modulus " << end << endl;
        }
        cout << endl;
    }
}