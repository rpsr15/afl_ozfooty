
// def max_subarray(A):
// 2     max_ending_here = max_so_far = A[0]
// 3     for x in A[1:]:
// 4         max_ending_here = max(x, max_ending_here + x)
// 5         max_so_far = max(max_so_far, max_ending_here)
// 6     return max_so_far
public class Test{
    public static void main(String[] args) {
    int[] t = {-2,1,-3,4,-1,2,1,-5,4};
    int max_ending_here  = t[0];
    int max_so_far = t[0];
    for(int i = 0; i < t.length ; i++)
    {
        System.out.println("max_ending_here+t[i]"+(max_ending_here+t[i])+" t[i] "+t[i]);
        max_ending_here = Math.max(max_ending_here+ t[i], t[i]);
        max_so_far = Math.max(max_so_far,max_ending_here);
        System.out.println("max so far :"+max_so_far);
    }
    System.out.println("final"+max_so_far);
    }
}