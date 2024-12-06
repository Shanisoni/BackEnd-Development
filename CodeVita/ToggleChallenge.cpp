#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <functional>

using namespace std;

// Check if a matrix can be toggled into another matrix with at most one change
bool canToggle(const vector<string> &original, const vector<string> &toggled) {
    int differences = 0;
    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 3; col++) {
            if (original[row][col] != toggled[row][col]) {
                differences++;
                if (differences > 1) return false;
            }
        }
    }
    return true;
}

// Convert lines into 3x3 matrices
vector<vector<string>> extractMatrices(const vector<string> &inputLines, int length) {
    vector<vector<string>> allMatrices;
    for (int start = 0; start < length; start += 3) {
        vector<string> matrix(3);
        for (int line = 0; line < 3; line++) {
            matrix[line] = inputLines[line].substr(start, 3);
        }
        allMatrices.push_back(matrix);
    }
    return allMatrices;
}

// Generate all possible numbers by toggling at most one LED per matrix
long long calculatePossibleSum(
    const vector<vector<string>> &digitTemplates, 
    const vector<vector<string>> &inputNumbers) 
{
    long long totalSum = 0;
    set<long long> validNumbers;

    int numberLength = inputNumbers.size();
    vector<int> currentDigits(numberLength);

    std::function<void(int)> generateCombinations = [&](int pos) {
        if (pos == numberLength) {
            long long generatedNumber = 0;
            for (int digit : currentDigits) 
                generatedNumber = generatedNumber * 10 + digit;
            
            validNumbers.insert(generatedNumber);
            return;
        }
        bool isValid = false;
        for (int i = 0; i < 10; i++) {
            if (inputNumbers[pos] == digitTemplates[i] || canToggle(digitTemplates[i], inputNumbers[pos])) {
                currentDigits[pos] = i;
                generateCombinations(pos + 1);
                isValid = true;
            }
        }
        if (!isValid) {
            throw "Invalid Input";
        }
    };

    try {
        generateCombinations(0);
        for (long long num : validNumbers) 
            totalSum += num;
        return totalSum;
    } catch (...) {
        return -1;  // Mark as Invalid
    }
}

int main() {
    vector<string> digitPatternLines(3), inputNumberLines(3);
    for (int i = 0; i < 3; i++) cin >> digitPatternLines[i];
    for (int i = 0; i < 3; i++) cin >> inputNumberLines[i];

    vector<vector<string>> digitTemplates = extractMatrices(digitPatternLines, 30);
    vector<vector<string>> inputNumbers = extractMatrices(inputNumberLines, inputNumberLines[0].length());

    long long result = calculatePossibleSum(digitTemplates, inputNumbers);
    if (result == -1) {
        cout << "Invalid";
    } else {
        cout << result;
    }
    return 0;
}
