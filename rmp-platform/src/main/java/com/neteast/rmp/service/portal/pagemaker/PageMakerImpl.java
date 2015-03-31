/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

/**
 * @author seraph
 *
 */
@Component("pageMaker")
public class PageMakerImpl implements PageMaker {
	
	@Autowired
	@Qualifier("tbarCreator")
	private Creator tbarCreator;
	
	@Autowired
	@Qualifier("parmCodeArrayCreator")
	private Creator parmCodeArrayCreator;
	
	@Autowired
	@Qualifier("noticeCellArrayCreator")
	private Creator noticeCellArrayCreator;
	
	@Autowired
	@Qualifier("neighbourCellHashCreator")
	private Creator neighbourCellHashCreator;
	
	@Autowired
	@Qualifier("parmDefaultValueArrayCreator")
	private Creator parmDefaultValueArrayCreator;

	public String getTbarDefine(String portalCode,String flag) {
		try {
			return tbarCreator.createToolbar(portalCode,flag);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getParmCodeArray(String portalCode) {
		try {
			return parmCodeArrayCreator.create(portalCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getNameDefine(String portalCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String isEditable(String portalCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String isDeleteable(String portalCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getFieldDefine(String portalCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getColumnDefine(String portalCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getFormDefine(String portalCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getParameterDefine(String portalCode) {
		// TODO Auto-generated method stub
		return null;
	}

	public void setTbarCreator(Creator tbarCreator) {
		this.tbarCreator = tbarCreator;
	}
	
	public void setParmCodeArrayCreator(Creator parmCodeArrayCreator) {
		this.parmCodeArrayCreator = parmCodeArrayCreator;
	}
	
	public void setNoticeCellArrayCreator(Creator noticeCellArrayCreator) {
		this.noticeCellArrayCreator = noticeCellArrayCreator;
	}

	@Override
	public String getNoticeCellArray(String portalCode) {
		try {
			return noticeCellArrayCreator.create(portalCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getNeighbourCellHash(String portalCode) {
		try {
			return neighbourCellHashCreator.create(portalCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public void setNeighbourCellHashCreator(Creator neighbourCellHashCreator) {
		this.neighbourCellHashCreator = neighbourCellHashCreator;
	}

	@Override
	public String getParmDefaultValueArray(String portalCode) {
		try {
			return parmDefaultValueArrayCreator.create(portalCode);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
