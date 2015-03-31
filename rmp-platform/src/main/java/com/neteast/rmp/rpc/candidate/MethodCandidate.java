package com.neteast.rmp.rpc.candidate;

import java.lang.reflect.Method;

import com.neteast.rmp.rpc.serializer.ObjectMatch;


public class MethodCandidate {

    /**
     * The method
     */
    public Method method;

    /**
     * The match data for each parameter of the method.
     */
    public ObjectMatch match[];

    /**
     * Creatse a new MethodCandidate
     * 
     * @param method The method for this candidate
     */
    public MethodCandidate(Method method)
    {
      this.method = method;
      match = new ObjectMatch[method.getParameterTypes().length];
    }

    /**
     * Gets an object Match for the method.
     * 
     * @return An object match with the amount of mismatches
     */
    public ObjectMatch getMatch()
    {
      int mismatch = -1;
      for (int i = 0; i < match.length; i++)
      {
        mismatch = Math.max(mismatch, match[i].getMismatch());
      }
      if (mismatch == -1)
      {
        return ObjectMatch.OKAY;
      }
      return new ObjectMatch(mismatch);
    }
  
}
