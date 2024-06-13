#include<bits/stdc++.h>
using namespace std;
int main(){
	array<int,5> arr;//declaration of array of c++ stl: array<data_type,size> array_name
	cout<<"input 5 numbers\n";
	for(int i = 0;i<5;i++){
		cin>>arr[i];//access elements by sq brackets or arr.at(i)
	}
	cout<<arr.front()<<endl;//returns first element of array
	cout<<arr.back()<<endl;//returns last element of array
	cout<<arr.size()<<endl;//returns size of array
	if(arr.empty())//boolean function, checks if array is empty or not
	cout<<"true";
	else cout<<"false";
}