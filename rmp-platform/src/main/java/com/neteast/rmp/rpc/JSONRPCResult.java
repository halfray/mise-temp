package com.neteast.rmp.rpc;

import java.io.CharArrayWriter;
import java.io.PrintWriter;
import java.util.List;

import org.apache.log4j.Logger;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

/**
 * Container for a JSON-RPC result message. This includes successful results,
 * error results, and remote exceptions results.
 */
public class JSONRPCResult
{
  public final static Logger log = Logger.getLogger(JSONRPCResult.class);
  /**
   * Denotes that the call was a success
   */
  public final static int CODE_SUCCESS = 0;

  /**
   * Denotes that an exception was thrown on the server
   */
  public final static int CODE_REMOTE_EXCEPTION = 490;

  /**
   * Denotes that an error occured while parsing the request.
   */
  public final static int CODE_ERR_PARSE = 590;

  /**
   * Denotes (when using a callable reference) that no method was found with the
   * given name.
   */
  public final static int CODE_ERR_NOMETHOD = 591;
  

  /**
   * Denotes that an error occured while unmarshalling the request.
   */
  public final static int CODE_ERR_UNMARSHALL = 592;

  /**
   * Denotes that an error occured while marshalling the response.
   */
  public final static int CODE_ERR_MARSHALL = 593;

  /**
   * Denotes that an error occured while applying the fixup data for circular references/duplicates.
   */
  public final static int CODE_ERR_FIXUP = 594;
  
  public final static int CODE_ERR_NOACTION = 595;

  public final static int CODE_REPORT = 594;
  /**
   * The error method shown when an error occured while parsing the request.
   */
  public final static String MSG_ERR_PARSE = "couldn't parse request arguments";

  /**
   * The error method shown when no method was found with the given name.
   */
  public final static String MSG_ERR_NOMETHOD = "method not found (session may have timed out)";
  public final static String MSG_ERR_NOACTION = "action not found ";

  /**
   * The error method shown when something in the fixups was amiss.
   */
  public final static String MSG_ERR_FIXUP = "invalid or unexpected data in fixups";

  /**
   * The result of the call
   */
  private Object result;

  /**
   * The id of the response.
   */
  private Object id;

  /**
   * Optional fixup entries to run against the result in order to reconstitute duplicate and / or circular references
   * that were detected.
   * This is a List of FixUp objects.
   * @see FixUp
   */
  private List fixUps;

  /**
   * An error code if a problem occured (CODE_SUCCESS otherwise)
   */
  private int errorCode;

  /**
   * Creates a new JSONRPCResult without fixups (for backward compatibility to json-rpc and json-rpc-java.
   *
   * @param errorCode An error code if a problem occured (CODE_SUCCESS
   *          otherwise)
   * @param id The id of the response.
   * @param o The result of the call
   */
  public JSONRPCResult(int errorCode, Object id, Object o)
  {
    this.errorCode = errorCode;
    this.id = id;
    this.result = o;
  }

  /**
   * Creates a new JSONRPCResult with fixUps.
   * 
   * @param errorCode An error code if a problem occured (CODE_SUCCESS
   *          otherwise)
   * @param id The id of the response.
   * @param o The result of the call
   * @param fixUps optional list of FixUp objects needed to resolve circular refs and duplicates.
   */
  public JSONRPCResult(int errorCode, Object id, Object o, List fixUps)
  {
    this.errorCode = errorCode;
    this.id = id;
    this.result = o;
    this.fixUps = fixUps;
  }

  /**
   * Gets the error code
   * 
   * @return the error code
   */
  public int getErrorCode()
  {
    return errorCode;
  }

  /**
   * Gets the id of the response.
   * 
   * @return the id of the response.
   */
  public Object getId()
  {
    return id;
  }

  /**
   * Gets the result of the call
   * 
   * @return the result
   */
  public Object getResult()
  {
    return result;
  }

  @Override
public String toString()
  {
    JSONObject o = new JSONObject();

    try
    {
      if (errorCode == CODE_SUCCESS)
      {
        o.put("id", id);
        o.put("result", result);
      }
      else if (errorCode == CODE_REMOTE_EXCEPTION)
      {
        Throwable e = (Throwable) result;
        CharArrayWriter caw = new CharArrayWriter();
        e.printStackTrace(new PrintWriter(caw));
        
        JSONObject err = new JSONObject();
        err.put("code", new Integer(errorCode));
        err.put("msg", e.getMessage());
        err.put("trace", caw.toString());
        
        o.put("id", id);
        o.put("error", err);
        
        log.error(e.getMessage(), e);
      }
      else
      {
        JSONObject err = new JSONObject();
        err.put("code", new Integer(errorCode));
        err.put("msg", result);
        o.put("id", id);
        o.put("error", err);
        
        log.error(err);
      }
    }
    catch (JSONException e)
    {
      // this would have been a null pointer exception in the previous json.org library.
      throw (RuntimeException) new RuntimeException(e.getMessage()).initCause(e);
    }
    return o.toString();
  }
}
