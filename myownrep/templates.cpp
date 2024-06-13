//dont see my code u trespasser :(
//khud ka likho bsdk
#include<bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#define pi 3.141592653589793238
#define min3(a,b,c)((a<b)?((a<c)?a:c):((b<c)?b:c))
#define int long long
#define all(a) (a).begin(),(a).end()
#define pb push_back
#define yes "YES"
#define no "NO"
#define ld long double
#define inf LLONG_MAX-69
#define int long long
#define here "here\n"
#define i32 int
#define ff first
#define ss second
#define endl "\n"
#define sz(a) (a).size()
#define set oset
#define vi vector<int>
#define vvi vector<vector<int>>
#define vpii vector<pair<int,int>>
#define vc vector<char>
#define pii pair<int,int>
#define fr(i,a,b) for(int (i) = (a); i <= (b); (i)++)
#define rf(i,b,a) for(int (i) = (b); i >= (a); (i)--)
#define mii map<int,int>
#define lcm(a,b) a*b/__gcd(a,b)
#define all1(a) (a).begin()+1,(a).end()
#define py cout<<"YES\n"
#define pn cout<<"NO\n"
using namespace __gnu_pbds;
using namespace std;
 //defining template for pbds set 
template <class T> using oset = tree<T, null_type,
less<T>, rb_tree_tag,tree_order_statistics_node_update>;
 //defining template for pbds multiset
template <class T> using oset_d = tree<T, null_type,
less_equal<T>, rb_tree_tag,tree_order_statistics_node_update>;
//*s.find_by_order(k):
//returns the element present at index k if present in set(index as if the set was an array)
//s.order_of_key(ele):
//return index of element 'ele' if present in set
//always use priority queue for dijkstra(not set)
const int mod=1e9+7;
const int mod1 = 998244353;
int binExpIter(int a,int b){
	if(b==0)return 1;
	int ans=1;
	while(b){
		if(b&1)ans=(ans*a);
		a=(a*a);
		b>>=1;
	}
	return ans%mod;
}
//find max in log(N)
//segment tree
const int N=1e5;
vi seg(4*N,0);
void build(vi &a,int idx,int low,int high){
	if(low==high){//base case when there is only one element in segment tree
		seg[idx]=a[low];
		return;
	}
	int mid=(low+high)/2;
	build(a,2*idx+1,low,mid);
	build(a,2*idx+2,mid+1,high);
	//seg[idx] is maximum of both left and right nodes
	seg[idx] = max(seg[2*idx+1],seg[2*idx+2]);
}
int rmq(vi &a,int idx,int low,int high,int l,int r){
	//if given node of segment tree completely lies within (l,r)
	if(low>=l && high<=r){
		return seg[idx];
	}
	//if given node of segment tree i disjoint with (l,r)
	if(low>=r || high<=l){
		return LLONG_MIN;
	}
	//else some part lies and some part doesn't
	//call for both left and right nodes
	int mid=(low+high)/2;
	int leftnode = rmq(a,2*idx+1,low,mid,l,r);//similar processing as above in left side
	int rightnode = rmq(a,2*idx+2,mid+1,high,l,r);//and fpr right side
	//you need to return max of both sides
	return max(leftnode,rightnode);
}
//dfs template
//void dfs(int vertex){//pass your graph g and visited array
//	//
//	vis[vertex]=1;
//	for(int child:g[vertex]){
//		//
//		if(vis[child])continue;
//		dfs(child);
//		//
//	}
//	//
//}

//void dfsbipartite(int v,int colorofv){ // check bipartite graph
//	vis[v]=1;
//	col[v]=colorofv;
//	for(int c:g[v]){
//		//
//		if(vis[c]){ // it can be that c is forced into a color same as its parent
//			if(colorofv==col[c])ok=0;
//		}
//		else{
//			dfs(c,colorofv^1); // go to child with a different color
//		}
//	}
//}
//ok==1 denotes bipartite and vice versa
//bfs template
void bfs(vi g[],vi &vis,vi &lvl,int src){
	queue<int> q;
	q.push(src);
	vis[src]=1;
	lvl[src]=0;
	while(!q.empty()){
		int x=q.front();
		cout<<"x: "<<x<<endl;
		q.pop();
		for(int cv:g[x]){
			if(vis[cv])continue;
			//kisi bhi node ko insert krte hi usko visited mark krdo
			q.push(cv);
			vis[cv]=1;
			lvl[cv]=lvl[x]+1;
		}
	}
}
//0-1 bfs mein visted array isnt necessary
void bfs01(vpii g[],vi &lvl,int src){
	deque<int> q;
	q.push_back(src);
	lvl[src]=0;
	while(!q.empty()){
		int x=q.front();
		q.pop_front();
		for(auto p:g[x]){
			int cv=p.ff;
			int wt=p.ss;
			if(lvl[x]+wt<lvl[cv]){
				lvl[cv]=lvl[x]+wt;
				//zero weight nodes ko same level par process karo
				//and one wale ko next par
				if(wt==1)q.push_back(cv);
				else q.push_front(cv);
			}
		}
	}
}
//dijkstra template
void dij1(vpii g[],vi &lvl,vi &vis,int src){
	priority_queue<pii,vpii,greater<pii>> q;
	q.push({0,src});
	lvl[src]=0;
	while(!q.empty()){
		int v=q.top().ss;
		int wt_v=q.top().ff;
		q.pop();
		//dij mein an inserted pair is processed only once
		if(vis[v])continue;
		vis[v]=1;
		for(auto p:g[v]){
			int cv=p.ff;int wt=p.ss;
			if(lvl[v]+wt<lvl[cv]){
				lvl[cv]=lvl[v]+wt;
				q.push({lvl[cv],cv});
			}
		}
	}
	//now lvl[i] has min distance from src to i
}
int findmex(vector<int> &a){//finds mex in O(n) for sorted or unsorted a
	//if n<=1e6 and maximium(a)<=1e6
	int n=sz(a);
	vi v(n+1,0);
	vi a1;
	//remove elements having value more than n
	for(int i:a){
		if(i<=n)a1.pb(i);
	}
	//mark elements already in array a1(which now has all values less than equal to n)
	for(int i:a1){
		v[i]=1;
	}
	fr(i,0,n){
		//return first unmarked element
		if(v[i]==0)return i;
	}
}
//bitwise OR of a subarray segment (l,r) in O(1)
//precomputation takes O(bits*n) time
const int N=1e5+10;
vi a;
//int p[bits][N];//p[i][j] means the number of bits set in ith position 
//taking numbers till jth index in array
int n;
const int bits=19;
void precompute(vvi &p){
	fr(i,0,bits){
		p[i][0]=(a[0]>>i)&1;
		fr(j,1,n-1){
			p[i][j]=(a[j]>>i)&1;
			p[i][j]+=p[i][j-1];
		}
	}
}
int rq(vvi &p,int l,int r){
	int ans=0;
	fr(i,0,bits){
		int cnt=p[i][r];
		if(l!=0)cnt-=p[i][l-1];
		if(cnt>0)ans=ans|(1<<i);
	}
	return ans;
}
void cheems1(){
	map<pair<int,int>,int> s;
}
signed main(){
	ios::sync_with_stdio(0);
    cin.tie(0);
    //cout.tie(0);
	int t=1;
	cin>>t;
	while(t--){
		cheems1();
	}
}
