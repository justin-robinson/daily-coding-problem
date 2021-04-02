/*
An XOR linked list is a more memory efficient doubly linked list. Instead of each node holding next and prev fields, it holds a field named both, which is an XOR of the next node and the previous node. Implement an XOR linked list; it has an add(element) which adds the element to the end, and a get(index) which returns the node at index.

If using a language that has no pointers (such as Python), you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.

link(A) = NULL ^ addr(B)        // bitwise XOR of NULL with address of node B
link(B) = addr(A) ^ addr(C)     // bitwise XOR between the address of node A and C
link(C) = addr(B) ^ addr(D)     // bitwise XOR between the address of node B and D
link(D) = addr(C) ^ NULL        // bitwise XOR of the address of node A with NULL
*/

#include <iostream>
using namespace std;

class XorDLL {
  public:
  XorDLL() {
    this->head = this->tail = nullptr;
  }
  class Node {
    public:
      int value;
      Node *both;
      Node(int value) {
        this->value = value;
        cout << "CONSTRUCT: "; this->print();
      }

      void print() {
        cout << "Node<" << this << ">\n\t both: " << this->both << "\n\t value: " << this->value << endl;
      }
  };
  public:
    void add(int element) {
      cout << "ADDING " << element << endl;
      Node newNode(element);
      if (!this->head) {
        cout << "SETTING HEAD\n";
        this->head = &newNode;
      }
      if (this->tail) {
        newNode.both = this->XOR(this->tail, nullptr);
        this->tail->both = this->XOR(this->tail->both, &newNode);
        cout << "TAIL: "; this->tail->print();
        cout << "NEW_NODE: "; newNode.print();
      }
      this->tail = &newNode;
    }

    Node *get(int index) {
      cout << "GET(" << index << ")" << endl;
      int currentIndex = 0;
      Node *previousNode = nullptr;
      Node *currentNode = this->head;
      
      while(currentIndex < index) {
        // currentNode->print();
        Node *nextNode = this->XOR(currentNode->both, previousNode);
        // nextNode->print();
        previousNode = currentNode;
        currentNode = nextNode;
        currentIndex++;
      }

      currentNode->print();
      return currentNode;
    }

    Node *head;
    Node *tail;

  private:

    Node *XOR(Node* x, Node* y) {
      return (Node*)((uintptr_t)(x) ^ (uintptr_t)(y));
    }
};

int main() {
  XorDLL list;

  list.add(0);

  XorDLL::Node *first = list.get(0);

  first->print();

  cout << "0 both: " << first->both << endl;
  cout << "0 value: " << first->value << endl;

  list.add(1);
  // XorDLL::Node *second = list.get(1);
  // cout << 6 << endl;
  // cout << "1 both: " << second->both << endl;
  // cout << "1 value: "<< second->value << endl;
  return 0;
}
