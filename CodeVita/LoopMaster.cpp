#include <iostream>
#include <vector>
#include <stack>
#include <string>
using namespace std;

int findLoopStartIndex(const vector<string>& cmdList, int currentIdx);
int findLoopEndIndex(const vector<string>& cmdList, int currentIdx);
void executeCommands(const vector<string>& cmdList) {
    stack<int> loopLimits;
    stack<int> currentIterations;
    string resultOutput;
    int currentLine = 0;
    while (currentLine < static_cast<int>(cmdList.size())) {
        string command = cmdList[currentLine];
        if (command.rfind("for", 0) == 0) {
            int iterations = stoi(command.substr(4));
            loopLimits.push(iterations);
            currentIterations.push(0);
        } else if (command == "do") {
        } else if (command == "done") {
            int currentIteration = currentIterations.top() + 1;
            currentIterations.pop();
            int limit = loopLimits.top();
            loopLimits.pop();
            if (currentIteration < limit) {
                loopLimits.push(limit);
                currentIterations.push(currentIteration);
                currentLine = findLoopStartIndex(cmdList, currentLine);
                continue;
            }
        } else if (command.rfind("break", 0) == 0) {
            int breakAt = stoi(command.substr(6));
            if (currentIterations.top() + 1 == breakAt) {
                loopLimits.pop();
                currentIterations.pop();
                currentLine = findLoopEndIndex(cmdList, currentLine); 
            }
        } else if (command.rfind("continue", 0) == 0) {
            int continueAt = stoi(command.substr(9));
            if (currentIterations.top() + 1 == continueAt) {
                int limit = loopLimits.top();
                int currentIteration = currentIterations.top() + 1;
                currentIterations.pop();
                if (currentIteration < limit) {
                    currentIterations.push(currentIteration);
                    currentLine = findLoopStartIndex(cmdList, currentLine); 
                }
                continue;
            }
        } else if (command.rfind("print", 0) == 0) {
            string outputMessage = command.substr(command.find("\"") + 1, command.rfind("\"") - command.find("\"") - 1);
            resultOutput += outputMessage + "\n";
        }
        currentLine++;
    }
    cout << resultOutput;
}
int findLoopStartIndex(const vector<string>& cmdList, int currentIdx) {
    int nestedLoopsCount = 0;
    for (int i = currentIdx - 1; i >= 0; i--) {
        if (cmdList[i] == "done") {
            nestedLoopsCount++;
        } else if (cmdList[i] == "do") {
            if (nestedLoopsCount == 0) {
                return i;
            }
            nestedLoopsCount--;
        }
    }
    return 0;
}

int findLoopEndIndex(const vector<string>& cmdList, int currentIdx) {
    int nestedLoopsCount = 0;
    for (int i = currentIdx + 1; i < static_cast<int>(cmdList.size()); i++) { // Fix signedness warning
        if (cmdList[i] == "do") {
            nestedLoopsCount++;
        } else if (cmdList[i] == "done") {
            if (nestedLoopsCount == 0) {
                return i;
            }
            nestedLoopsCount--;
        }
    }
    return cmdList.size();
}

int main() {
    int n;
    cin >> n;
    cin.ignore();
    vector<string> commands(n);
    for (int i = 0; i < n; i++) {
        getline(cin, commands[i]);
    }

    executeCommands(commands);
    return 0;
}




